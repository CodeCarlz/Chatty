import { UserProvider } from "@/context/Usercontext";
import SocketProvider from "@/context/socketcontext";

export default function HomeLayout({ children }) {
  return (
    <UserProvider>
      <SocketProvider>{children}</SocketProvider>
    </UserProvider>
  );
}
