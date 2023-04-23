import { find2048 } from "../../services/functions";
import "./Header.css";

const Header = ({ status, array }) => {
    const congrats = status === 1 && find2048(array);
    return (
        <header className="flex-center header">
            <p className={congrats ? "congrats" : ""}>
                {congrats ? "Сongratulations!" : 2048}
            </p>
        </header>
    );
};

export default Header;
