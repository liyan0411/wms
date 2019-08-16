import router from '.'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()


  // if (to.path === '/login') {
  //   // if is logged in, redirect to the home page
  //   next({ path: '/' })

  // } else {
  next()
  NProgress.done()
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
