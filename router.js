class Router {
  constructor(routes){
    this.routes = routes;
    this._loadInitialRoutes()
  }
  loadRoute(...urlSegs){
    const matchedRoute = this._matchUrlToRoute(urlSegs) // Manda el parametro [""] OR ["Contacto"] a funcion
    const url = `/${urlSegs.join('/')}`

    history.pushState({},'this works', url)

    const routerOutElement = document.querySelectorAll('[data-router]')[0]
    routerOutElement.innerHTML = matchedRoute.template
  }

  _matchUrlToRoute(urlSegs){
    const matchedRoute = this.routes.find(route => {
      const routePathSegs = route.path.split('/').slice(1)

      if(routePathSegs.length !== urlSegs.length){
        return false
      }

      return routePathSegs
        .every((routePathSeg, i) => routePathSeg === urlSegs[i])
    })
    return matchedRoute
  }

  _loadInitialRoutes(){
    const pathNameSplit = window.location.pathname.split('/') // ["",""] OR ["","Contacto"]
    const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : '' // [""] OR ["Contacto"]

    this.loadRoute(...pathSegs) //Pasa el parametro [""] OR ["Contacto"]
  }
}
