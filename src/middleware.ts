// middleware.js
import { withMiddlewareAuthRequired,getSession } from '@auth0/nextjs-auth0/edge';
import { NextRequest,NextResponse } from 'next/server';
import { getUserRoles, } from './lib/auth';



export default withMiddlewareAuthRequired(async(req:NextRequest)=>{
  const res=NextResponse.next();
  const session=await getSession(req,res);
  const roles=await getUserRoles(session?.user.sub);
  const isAdmin=await roles.some((role:any)=>role.name==='admin');
  if(req.url.includes('/admin')&&!isAdmin){
    return NextResponse.redirect(new URL('/error/unauthorized', req.url));
  }
  
  
  
});

export const config = {
  matcher: ['/admin/:path*'], 
};

