import { Metadata } from 'next';
import { ReactNode } from 'react';
import { Navbar } from '@/components/header/app-header';
import { ChatSidebar, ChatSidebarProvider } from '@/components/chat-sidebar';


export const metadata: Metadata = {
  title: 'Postrade',
  description: 'A workspace for your team, powered by Stream Chat and Clerk.',
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <ChatSidebarProvider>
        <main>
          <Navbar />
          <section className="min-h-screen flex-1 flex-col px-12 pb-6 pt-28 max-md:pb-14 sm:px-24">
            {children}
          </section>
          <ChatSidebar />
        </main>
    </ChatSidebarProvider>
  );
};

export default RootLayout;

