// src/types/ButtonTypes.ts

import {ButtonHTMLAttributes} from 'react';

type Variant = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  // 추가적인 커스텀 props를 여기에 정의할 수 있습니다.
}
