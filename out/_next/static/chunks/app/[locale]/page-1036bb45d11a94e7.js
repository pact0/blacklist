(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[61],{8999:(e,r,t)=>{Promise.resolve().then(t.bind(t,7488))},7488:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>w});var l=t(9004),n=t(3690);t(3673);var a=t(9516),s=t(1679),i=t.n(s),c=t(9323);let o=()=>{let e=(0,n.useTranslations)("BlacklistPage"),r=(0,c.NL)();return(0,l.jsx)("button",{onClick:()=>{r.invalidateQueries({queryKey:["blacklist"],exact:!0})},children:e("refresh_blacklist")})};var d=t(7121),u=t(9478),h=t(7489),k=t(5808),v=t(9195);let m={en:k._,pl:v.pl},p=e=>{let{date:r}=e,t=(0,n.useTranslations)("Date"),a=(0,n.useLocale)();return(0,u.J)(r)?(0,l.jsx)("div",{children:(0,h.WU)(r,"PPP",{locale:m[a]})}):(0,l.jsx)("div",{children:t("unknown")})},_=e=>{if(null==e)return!1;let r=String(e).toLowerCase().trim();return!!["y","yes","t","true"].includes(r)||(["n","no","f","false"].includes(r),!1)},b=e=>{let r=x(e);return(0,d.Qc)(r,"dd/MM/yyyy",new Date)},x=e=>null==e?"":String(e).trim().replace(/^"|"$/g,"").replace(/\s+/g," ").trim(),f=e=>{if(null==e||""===e)return null;let r=parseInt(x(e),10);return isNaN(r)?null:r},y=async()=>{let e=await fetch("https://raw.githubusercontent.com/The-Forbidden-Trove/ForbiddenTroveBlacklist/main/blacklist.csv");if(!e.ok)throw Error("Network response was not ok");let r=await e.text();return console.log(r),new Promise((e,t)=>{i().parse(r,{header:!0,transformHeader:e=>e.toLowerCase().trim(),skipEmptyLines:!0,escapeChar:'"',complete:r=>{e(r.data.filter(e=>""!==x(e.account_name)).map(e=>({account_name:x(e.account_name),discord_id:f(e.discord_id),blacklisted_on:b(e.blacklisted_on),reason:x(e.reason),active:_(e.active)})))},error:()=>{t(Error("Error parsing CSV"))}})})},j=()=>{let{data:e,isLoading:r,isError:t}=(0,a.a)({queryKey:["blacklist"],queryFn:y,staleTime:3e5,refetchInterval:3e5}),s=(0,n.useTranslations)("BlacklistPage");return r?(0,l.jsx)("div",{children:s("loading_blacklist")}):t?(0,l.jsx)("div",{children:s("failed_blacklist")}):(0,l.jsxs)("div",{children:[(0,l.jsx)("h2",{children:"Blacklisted Entries"}),(0,l.jsx)(o,{}),null==e?void 0:e.map((e,r)=>{let{account_name:t,discord_id:n,blacklisted_on:a,reason:s}=e;return(0,l.jsxs)("div",{children:[t," (",n,") - ",s,(0,l.jsx)(p,{date:a})]},"blEntry-".concat(n,"-").concat(t,"-").concat(s,"-").concat(r))})]})},w=()=>{let e=(0,n.useTranslations)("HomePage");return(0,l.jsxs)("div",{children:[(0,l.jsx)("h1",{children:e("title")}),(0,l.jsx)(j,{})]})}}},e=>{var r=r=>e(e.s=r);e.O(0,[831,141,723,700,744],()=>r(8999)),_N_E=e.O()}]);