import s from './SideBar.module.scss';

/*import homeOutline from "../../../assets/icons/home-outline.svg"*/
import home from '../../../assets/icons/home.svg';

export const SideBar = () => {
  return (
    <div className={s.sidebarContainer}>
      <div className={s.buttonContainer}>
        <button>
          <img src={home.src} />
          Home
        </button>
        <button>Create</button>
        <button>My Profile</button>
        <button>Messenger</button>
        <button>Search</button>
      </div>
      <div className={s.buttonContainer}>
        <button>Statistics</button>
        <button>Favorites</button>
      </div>
      <div className={s.logOutButtonContainer}>
        <button>Log Out</button>
      </div>
    </div>
  );
};
