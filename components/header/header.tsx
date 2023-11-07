import { LangSelect } from '@/components/langSelect/LangSelect';

/*import s from './header.module.scss';*/
import outlineBell from './../../assets/icons/outlineBell.svg';

export const Header = () => {
  const isLogged = false;

  return (
    <div>
      <div>
        <div>inctagram</div>
        <div>
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
