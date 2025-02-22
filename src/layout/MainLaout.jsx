import { Outlet } from "react-router-dom";
import Header from "../components/Shared/Header";

const MainLaout = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default MainLaout;