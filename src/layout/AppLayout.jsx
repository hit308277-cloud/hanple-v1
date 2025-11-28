import TopBar from "../components/TopBar";
import BottomTab from "../components/BottomTab";
export default function AppLayout({children}){return(<div><TopBar/><main>{children}</main><BottomTab/></div>);}