import { NextResponse, type NextRequest } from 'next/server';

// Routes that do NOT require authentication
const PUBLIC_ROUTES = ['/login', '/access-denied', '/about'];

// Routes restricted from Picker role
const PICKER_RESTRICTED_ROUTES = [
  '/analytics',
  '/decision-center',
  '/approvals',
  '/damage-inspection',
  '/ai-assistant',
  '/settings',
  '/employees',
  '/inventory',
  '/warehouse',
];


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip static assets, favicon, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  // 2. Read authenticated role from cookies
  const roleCookie = request.cookies.get('warehouseiq_role')?.value || '';
  const authCookie = request.cookies.get('warehouseiq_auth')?.value;
  const isAuthenticated = authCookie === 'true' && !!roleCookie;

  // 3. Unauthenticated user handling
  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. If authenticated and visiting /login, redirect to appropriate console
  if (isAuthenticated && pathname === '/login') {
    const userRole = roleCookie.toUpperCase();
    if (userRole === 'PICKER') {
      return NextResponse.redirect(new URL('/dashboard/picker', request.url));
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 5. Role-Based Access Control (RBAC)
  if (isAuthenticated) {
    const userRole = roleCookie.toUpperCase();

    if (userRole === 'PICKER') {
      const isRestricted = PICKER_RESTRICTED_ROUTES.some((restricted) =>
        pathname === restricted || pathname.startsWith(`${restricted}/`)
      );

      if (isRestricted) {
        return NextResponse.redirect(new URL('/access-denied', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
