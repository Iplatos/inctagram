import s from './Header.module.scss';

import outlineBell from './../../assets/icons/outlineBell.svg';
import { LangSelect } from '@/components/langSelect/LangSelect';

export const Header = () => {
  const isLogged = false;

  return (
    <div className={s.headerContainer}>
      <div className={s.header}>
        <div>inctagram</div>
        <div className={s.headerInterface}>
          {isLogged ? <img alt={'outlineBell logo'} src={outlineBell.src} /> : ' '}
          <div>SUPURSELECT</div>
          {isLogged ? (
            ''
          ) : (
            <div>
              <button>login</button>
              <button>signUp</button>
            </div>
          )}
          <LangSelect />
        </div>
      </div>
    </div>
  );
};
