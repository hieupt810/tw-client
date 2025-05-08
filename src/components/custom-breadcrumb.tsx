import React from 'react';

import { cn } from '@/lib/utils';

import MaxWidthContainer from './max-width-container';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { Skeleton } from './ui/skeleton';

type Props = {
  links?: {
    href?: string;
    label?: string;
  }[];
  className?: string;
};

export default function CustomBreadcrumb({
  links = [],
  className = '',
}: Props) {
  links.unshift({ label: 'Home', href: '/' });

  return (
    <div className={cn('border-grid border-b', className)}>
      <MaxWidthContainer>
        <Breadcrumb>
          <BreadcrumbList>
            {links.map((link, index) => (
              <React.Fragment key={index}>
                {index === links.length - 1 ? (
                  link.label ? (
                    <BreadcrumbPage>{link.label}</BreadcrumbPage>
                  ) : (
                    <Skeleton className='h-5 w-80' />
                  )
                ) : (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={link.href}>
                        {link.label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </MaxWidthContainer>
    </div>
  );
}
