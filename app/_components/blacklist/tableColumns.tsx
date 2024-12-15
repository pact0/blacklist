import { BlacklistEntry } from "@/app/_models/BlacklistEntry";
import { ColumnDef } from "@tanstack/react-table";
import DefaultHeader from "../table/DefaultHeader";
import { BadgeAlert, CircleUser, Clock, ShieldBan } from "lucide-react";
import { DiscordId } from "./DiscordId";
import Image from "next/image";
import DiscordLogo from "@public/icons/discord_logo.png";
import { LocalizedDate } from "../LocalizedDate";
import { PoeAccountLink } from "./PoeAccountLink";

export const columns: ColumnDef<BlacklistEntry>[] = [
  {
    accessorKey: "account_name",
    header: (header) => (
      <DefaultHeader
        justifyLeft
        header={header}
        name="name"
        icon={<CircleUser className="h-4 w-4" />}
      />
    ),
    cell: ({ getValue }) => {
      const name = getValue<string>();
      return (
        <div className="flex items-center justify-start">
          <PoeAccountLink accountName={name} />
        </div>
      );
    },

    meta: {
      filterVariant: "text",
    },
    filterFn: "includesString",

    enableSorting: true,
    enableColumnFilter: true,
    enableGrouping: false,
  },

  {
    accessorKey: "reason",
    header: (header) => (
      <DefaultHeader
        header={header}
        name="reason"
        icon={<BadgeAlert className="h-4 w-4" />}
      />
    ),
    cell: ({ getValue }) => {
      return (
        <div className="flex items-center justify-center">
          {getValue<string>()}
        </div>
      );
    },

    filterFn: "includesString",

    enableSorting: false,
    enableColumnFilter: true,
    enableGrouping: true,
  },

  {
    accessorKey: "discord_id",
    header: (header) => (
      <DefaultHeader
        header={header}
        name="discord_id"
        icon={<Image src={DiscordLogo} alt="DiscordLogo" className="h-4 w-4" />}
      />
    ),
    cell: ({ getValue }) => {
      const discordId = getValue<number>();
      return (
        <div className="flex items-center justify-center">
          <DiscordId discord_id={discordId} />
        </div>
      );
    },

    filterFn: "includesString",

    enableSorting: false,
    enableColumnFilter: true,
    enableGrouping: false,
  },

  {
    // id: "blacklisted_on",
    // accessorFn: (entry) => entry.blacklisted_on.getTime(),
    accessorKey: "blacklisted_on",
    header: (header) => (
      <DefaultHeader
        header={header}
        name="blacklisted_on"
        icon={<Clock className="h-4 w-4" />}
      />
    ),
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      return (
        <div className="flex items-center justify-center">
          <LocalizedDate date={date} />
        </div>
      );
    },

    meta: {
      filterVariant: "date",
    },

    filterFn: "inNumberRange",
    sortingFn: (a, b) =>
      a.original.blacklisted_on.getTime() - b.original.blacklisted_on.getTime(),

    enableSorting: true,
    enableColumnFilter: true,
    enableGrouping: false,
  },

  {
    accessorKey: "active",
    header: (header) => (
      <DefaultHeader
        header={header}
        name="is_active"
        icon={<ShieldBan className="h-4 w-4" />}
      />
    ),
    cell: ({ getValue }) => {
      const isActive = getValue<boolean>();
      return (
        <div className="flex items-center justify-center">
          {isActive ? "Yes" : "No"}
        </div>
      );
    },

    filterFn: "includesString",

    enableSorting: false,
    enableColumnFilter: true,
    enableGrouping: true,
  },
];
