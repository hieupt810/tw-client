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

type ILink = {
  href?: string;
  label?: string;
};

const CustomBreadcrumb = ({
  links = [],
  className = '',
}: {
  links?: ILink[];
  className?: string;
}) => {
  links.unshift({ label: 'Home', href: '/' });

  return (
    <div className={cn('border-grid border-b', className)}>
      <MaxWidthContainer>
        <Breadcrumb>
          <BreadcrumbList>
            {links.map((link, index) => (
              <React.Fragment key={index}>
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
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </MaxWidthContainer>
    </div>
  );
};

export default CustomBreadcrumb;
