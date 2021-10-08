import { Link } from 'react-router-dom';
import { UnorderedList as List } from '../../components/UnorderedList';

export const ENTREE_PATH = 'entree';

export const Entree = () => {
  return (
    <div style={{ marginLeft: 25 }}>
      <h2>Entrée</h2>
      <List>
        <Link to="">Salade du Chef</Link>
        <Link to="">Salade César</Link>
        <Link to="">Soupe aux légumes du jour</Link>
        <Link to="">Fondues parmesan maison</Link>
        <Link to="">Bâtonnets de fromage</Link>
        <Link to="">Oignons français</Link>
        <Link to="">Nachos</Link>
        <Link to="">Ailes de poulet</Link>
        <Link to="">Bouchées mix</Link>
      </List>
    </div>
  );
}
