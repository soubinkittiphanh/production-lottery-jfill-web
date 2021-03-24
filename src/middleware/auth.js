export default function auth({next, router}){
    console.log('middleware auth test');
    return next();
}