'use client';

import { useRef, useState } from 'react';

import { Link } from '@tanstack/react-router';
import { useAuth } from '@workos/authkit-tanstack-react-start/client';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Globe,
  Home,
  Menu,
  Network,
  SquareFunction,
  StickyNote,
  X,
} from 'lucide-react';

import WorkOSHeader from './workos-user.tsx';

const DRAWER_TOGGLE_ID = 'nav-drawer-toggle';

export default function Header() {
  const [groupedExpanded, setGroupedExpanded] = useState<Record<string, boolean>>({});

  // The drawer is driven by a checkbox + CSS rather than React state so that it
  // opens on the first click even before hydration has attached any handlers.
  const drawerToggle = useRef<HTMLInputElement>(null);
  const closeDrawer = () => {
    if (drawerToggle.current) {
      drawerToggle.current.checked = false;
    }
  };

  const { user, signOut } = useAuth();

  return (
    <>
      <input
        ref={drawerToggle}
        id={DRAWER_TOGGLE_ID}
        type="checkbox"
        className="peer sr-only"
        aria-label="Toggle navigation menu"
      />

      {/* The real control is the visually hidden checkbox above, so mirror its
          keyboard focus onto the visible labels that stand in for it. */}
      <header className="p-4 flex items-center bg-gray-800 text-white shadow-lg peer-focus-visible:[&_label]:ring-2 peer-focus-visible:[&_label]:ring-cyan-400">
        <label htmlFor={DRAWER_TOGGLE_ID} className="p-2 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer">
          <Menu size={24} />
        </label>
        <h1 className="ml-4 text-xl font-semibold">
          <Link to="/">
            <img src="/tanstack-word-logo-white.svg" alt="TanStack Logo" className="h-10" />
          </Link>
        </h1>
      </header>

      <aside className="fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col -translate-x-full peer-checked:translate-x-0">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Navigation</h2>
          <label
            htmlFor={DRAWER_TOGGLE_ID}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
          >
            <X size={24} />
          </label>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/"
            onClick={closeDrawer}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className: 'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            <Home size={20} />
            <span className="font-medium">Home</span>
          </Link>

          {/* Demo Links Start */}

          <Link
            to="/demo/start/server-funcs"
            onClick={closeDrawer}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className: 'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            <SquareFunction size={20} />
            <span className="font-medium">Start - Server Functions</span>
          </Link>

          <Link
            to="/demo/start/api-request"
            onClick={closeDrawer}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className: 'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            <Network size={20} />
            <span className="font-medium">Start - API Request</span>
          </Link>

          <div className="flex flex-row justify-between">
            <Link
              to="/demo/start/ssr"
              onClick={closeDrawer}
              className="flex-1 flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
              activeProps={{
                className:
                  'flex-1 flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
              }}
            >
              <StickyNote size={20} />
              <span className="font-medium">Start - SSR Demos</span>
            </Link>
            <button
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() =>
                setGroupedExpanded((prev) => ({
                  ...prev,
                  StartSSRDemo: !prev.StartSSRDemo,
                }))
              }
            >
              {groupedExpanded.StartSSRDemo ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
          {groupedExpanded.StartSSRDemo && (
            <div className="flex flex-col ml-4">
              <Link
                to="/demo/start/ssr/spa-mode"
                onClick={closeDrawer}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
                activeProps={{
                  className:
                    'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                }}
              >
                <StickyNote size={20} />
                <span className="font-medium">SPA Mode</span>
              </Link>

              <Link
                to="/demo/start/ssr/full-ssr"
                onClick={closeDrawer}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
                activeProps={{
                  className:
                    'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                }}
              >
                <StickyNote size={20} />
                <span className="font-medium">Full SSR</span>
              </Link>

              <Link
                to="/demo/start/ssr/data-only"
                onClick={closeDrawer}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
                activeProps={{
                  className:
                    'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                }}
              >
                <StickyNote size={20} />
                <span className="font-medium">Data Only</span>
              </Link>
            </div>
          )}

          <Link
            to="/demo/workos"
            onClick={closeDrawer}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className: 'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            <CircleUserRound size={20} />
            <span className="font-medium">WorkOS</span>
          </Link>

          <Link
            to="/demo/convex"
            onClick={closeDrawer}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className: 'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            <Globe size={20} />
            <span className="font-medium">Convex</span>
          </Link>

          <Link
            to="/demo/convex-requests"
            onClick={closeDrawer}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className: 'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            <Globe size={20} />
            <span className="font-medium">Convex Requests</span>
          </Link>

          <Link
            to="/demo/sentry/testing"
            onClick={closeDrawer}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className: 'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            <Globe size={20} />
            <span className="font-medium">Sentry</span>
          </Link>

          <Link
            to="/demo/storybook"
            onClick={closeDrawer}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className: 'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            <BookOpen size={20} />
            <span className="font-medium">Storybook</span>
          </Link>

          <Link
            to="/demo/tanstack-query"
            onClick={closeDrawer}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className: 'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            <Network size={20} />
            <span className="font-medium">TanStack Query</span>
          </Link>

          {/* Demo Links End */}
        </nav>

        <div className="p-4 border-t border-gray-700 bg-gray-800 flex flex-col gap-2">
          {user ? (
            <button
              onClick={() => signOut()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Sign Out
            </button>
          ) : (
            <WorkOSHeader />
          )}
        </div>
      </aside>
    </>
  );
}
