import { UserProvider } from "@/context/Usercontext";

export default function HomeLayout({ children }) {
  return <UserProvider>{children}</UserProvider>;
}
