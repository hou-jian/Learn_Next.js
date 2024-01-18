import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    //该选项还可以自定义登录、注销和错误页面的路由
    signIn: '/login', //用户将被重定向到我们的自定义登录页面，而不是 NextAuth.js 默认页面。
  },
  callbacks: {
    //authorized 回调用于验证请求是否有权通过 Next.js 中间件访问页面。
    //它在请求完成之前调用，并接收具有 auth 和 request 属性的对象。
    //auth 属性包含用户会话， request 属性包含传入请求。
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; //登录验证失败，会重定向到 login 页面
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl)); //已经登录，但没在 dashboard 页面，重定向过去
      }
      return true;
    },
  },
  providers: [], //用于指定默认使用的登录选项，例如 Google 或 GitHub。对于本课程，我们将仅关注使用凭证提供程序，但不在这里指定，见 ./auth.ts 中。
} satisfies NextAuthConfig;
