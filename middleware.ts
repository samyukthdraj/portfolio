import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // If it's the login page, let them through
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    // Check for auth cookie
    const authCookie = request.cookies.get('admin_session');
    
    // Simplistic auth check for portfolio purposes
    if (!authCookie || authCookie.value !== process.env.ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
