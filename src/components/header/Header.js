import { find2048 } from "../../services/functions";

const Header = ({ status, array }) => (
    <header className="flex-center header">
        {status === 1 && find2048(array) ? "Сongratulations!" : 2048}
    </header>
);

export default Header;
