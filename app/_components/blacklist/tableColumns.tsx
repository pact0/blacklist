import { BlacklistEntry } from "@/app/_models/BlacklistEntry";
import { ColumnDef } from "@tanstack/react-table";
import DefaultHeader from "../table/DefaultHeader";
import { BadgeAlert, CircleUser, Clock } from "lucide-react";
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
    accessorKey: "blacklisted_on",
    header: (header) => (
      <DefaultHeader
        header={header}
        name="blacklisted_on"
        justifyRight
        icon={<Clock className="h-4 w-4" />}
      />
    ),
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      return (
        <div className="flex items-center justify-end">
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
];
