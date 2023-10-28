import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import styles from './Select.module.scss';
import Image from 'next/image';
import {
  CSSProperties,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import Arrow from '@/public/icons/Arrow.svg';

type Option = {
  value: string;
  label: string;
  image?: string;
};

type SelectProps = {
  width: 'small' | 'medium';
  options?: Option[];
} & HTMLAttributes<HTMLDivElement>;

export const Select = ({ width, options, ...props }: SelectProps) => {
  const defaultOption = {
    value: '',
    label: '',
    image: '',
  };
  const [currentOption, setCurrentOption] = useState(options?.[0] ?? defaultOption);
  const [collapsed, setCollapsed] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionHandler = (i: number) => {
    setCollapsed(!collapsed);
    setCurrentOption(options![i]);
  };

  const clickAwayHandler = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setCollapsed(true);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickAwayHandler);

    return () => {
      document.removeEventListener('mousedown', clickAwayHandler);
    };
  }, []);

  return (
    <div ref={selectRef} className={`${styles.select} ${styles[`select-${width}`]}`}>
      <div className={styles['select-field']} onClick={() => setCollapsed(!collapsed)}>
        <div className={styles.option}>
          {currentOption.image && <Image src={currentOption.image} alt={currentOption.value} />}
          <span>{currentOption.label}</span>
        </div>
        <Image
          src={Arrow}
          alt="Select arrow"
          className={`${styles.arrow} ${!collapsed ? styles['arrow-rotated'] : ''}`}
        />
      </div>
      <ul style={{ display: collapsed ? 'none' : 'block' }}>
        {options?.map((option, i) => (
          <li key={i} className={styles.option} onClick={() => optionHandler(i)}>
            {option.image && <Image src={option.image} alt={option.value} />}
            <span>{option.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

Select.defaultProps = {
  width: 'medium',
};

// type Option = {
//   value: string;
//   label: string;
//   flagName?: string;
// };

// type SelectProps = {
//   width: 'small' | 'medium';
//   type: 'text' | 'flag';
//   options?: Option[];
// } & SelectHTMLAttributes<HTMLSelectElement>;

// export const Select = ({ width, type, options, ...props }: SelectProps) => {
//   const [flag, setflag] = useState('');

//   return (
//     <select
//       {...props}
//       className={`${styles.select} ${styles[`select-${width}`]}`}
//       style={flag ? { backgroundImage: `url(${flag})` } : undefined}
//     >
//       {options?.map((option, i) => (
//         <option
//           key={i}
//           value={option.value}
//           className={`${styles.option} ${option.flagName && styles[option.flagName]}`}
//         >
//           {option.label}
//         </option>
//       ))}
//     </select>
//   );
// };

// Select.defaultProps = {
//   width: 'medium',
//   type: 'text',
// };

// export const Select = ({ options }: { options: Option[] }) => {
//   return (
//     <select className={styles.select}>
//       {options.map(option => (
//         <option style="background-image:url(male.png);">male</option>
//         <option key={option.value} value={option.value} className={styles.option}>
//           {option.image && <img src={option.image} alt={option.label} width={20} height={20} />}
//           {option.label}
//         </option>

//         <option key={option.value} value={option.value} className={styles.option}>
//           {option.image && <img src={option.image} alt={option.label} width={20} height={20} />}
//           {option.label}
//         </option>

//         <>
//           <input type="radio" name="color" value={option.value} id={option.label} />
//           <label htmlFor={option.label}>
//             {option.image && <Image src={option.image} alt={option.label} />} {option.label}
//           </label>
//         </>
//       ))}
//     </select>
//   );
// };
