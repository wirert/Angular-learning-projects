import { NgModule } from "@angular/core";
import { Routes, RouterModule, UrlSerializer } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ContactComponent } from "./contact/contact.component";
import { AboutComponent } from "./about/about.component";
import { PopularComponent } from "./home/popular/popular.component";
import { CoursesComponent } from "./courses/courses.component";
import { CourseDetailComponent } from "./courses/course-detail/course-detail.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { LoginComponent } from "./login/login.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { AuthGuardService } from "./Services/authguard.service";
import { CanActivate, resolve } from "./auth.guard";

const routes: Routes = [
  { path: "", component: HomeComponent, title: "Home page" },
  //or
  // { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent, title: "Home page" },
  { path: "about", component: AboutComponent },
  {
    path: "contact",
    component: ContactComponent,
    canDeactivate: [(component: ContactComponent) => component.canExit()],
  },
  {
    path: "courses",
    component: CoursesComponent,
    resolve: { courses: resolve },
  },
  // { path: "courses/course/:id", component: CourseDetailComponent },
  {
    path: "courses",
    canActivateChild: [CanActivate],
    children: [
      { path: "course/:id", component: CourseDetailComponent },
      { path: "popular", component: PopularComponent },
      {
        path: "checkout",
        component: CheckoutComponent,
        //canActivate: [AuthGuardService],
        //canActivate: [CanActivate],
      },
    ],
  },
  { path: "login", component: LoginComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
