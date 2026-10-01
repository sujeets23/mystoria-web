import React, { useState } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { TextRoll } from '@/components/ui/text-roll';

export type TextRollLinkProps = {
  children: string;
  to?: string;
  href?: string;
  className?: string;
  rollOnHover?: boolean;
  rollDuration?: number;
  getEnterDelay?: (index: number) => number;
  getExitDelay?: (index: number) => number;
  suffix?: React.ReactNode;
} & (
  | (Omit<LinkProps, 'to' | 'children'> & { to: string; href?: never })
  | (Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'> & { href: string; to?: never })
  | (React.HTMLAttributes<HTMLSpanElement> & { to?: never; href?: never })
);

export function TextRollLink({
  children,
  to,
  href,
  className = '',
  rollOnHover = true,
  rollDuration = 0.35,
  getEnterDelay = (i) => i * 0.025,
  getExitDelay = (i) => i * 0.025 + 0.05,
  suffix,
  ...rest
}: TextRollLinkProps) {
  const [trigger, setTrigger] = useState(0);

  const handleMouseEnter = (e: React.MouseEvent<any>) => {
    if (rollOnHover) {
      setTrigger((prev) => prev + 1);
    }
    if ('onMouseEnter' in rest && typeof rest.onMouseEnter === 'function') {
      rest.onMouseEnter(e);
    }
  };

  const content = (
    <>
      <TextRoll
        key={trigger}
        duration={rollDuration}
        getEnterDelay={getEnterDelay}
        getExitDelay={getExitDelay}
      >
        {children}
      </TextRoll>
      {suffix}
    </>
  );

  if (to) {
    const { onMouseEnter: _ome, to: _to, ...linkProps } = rest as any;
    return (
      <Link
        to={to}
        className={className}
        onMouseEnter={handleMouseEnter}
        {...linkProps}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    const { onMouseEnter: _ome, href: _href, ...anchorProps } = rest as any;
    return (
      <a
        href={href}
        className={className}
        onMouseEnter={handleMouseEnter}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  return (
    <span
      className={className}
      onMouseEnter={handleMouseEnter}
      {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
    >
      {content}
    </span>
  );
}
