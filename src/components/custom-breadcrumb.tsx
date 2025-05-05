import { Fragment } from 'react';

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

type Props = {
  links: { label: string; href: string }[];
  className?: string;
};

export default function CustomBreadcrumb({ links, className = '' }: Props) {
  return (
    <div className={cn('border-grid border-b', className)}>
      <MaxWidthContainer className='py-4'>
        <Breadcrumb>
          <BreadcrumbList>
            {links.map((link, index) => (
              <Fragment key={index}>
                {index === links.length - 1 ? (
                  <BreadcrumbPage>{link.label}</BreadcrumbPage>
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
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </MaxWidthContainer>
    </div>
  );
}
