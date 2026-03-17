"use client";

import React, { HTMLAttributes, ReactNode } from "react";
import { MDXProvider } from "@mdx-js/react";

interface MDXLayoutProps {
  children: ReactNode;
}

const mdxComponents = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold mt-8 mb-6 tracking-tight" {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-3xl font-semibold mt-8 mb-4 tracking-tight"
      {...props}
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-semibold mt-6 mb-3" {...props} />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 text-lg leading-relaxed" {...props} />
  ),
  a: (props: HTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-blue-600 hover:underline" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc ml-6 mb-4" {...props} />
  ),
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal ml-6 mb-4" {...props} />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li className="mb-2" {...props} />
  ),
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-gray-300 pl-4 italic my-4"
      {...props}
    />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded"
      {...props}
    />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto"
      {...props}
    />
  ),
};

const MDXLayout: React.FC<MDXLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12 mt-10">
        <article className="prose dark:prose-invert max-w-3xl mx-auto">
          <MDXProvider components={mdxComponents}>{children}</MDXProvider>
        </article>
      </main>
    </div>
  );
};

export default MDXLayout;
