import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./Services/auth.service";
import { CourseService } from "./Services/course.service";

export const CanActivate = function (): boolean {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  if (authService.IsAuthenticated()) {
    return true;
  } else {
    router.navigate(["/login"]);
    return false;
  }
};

// export const CanActivateChild = function () {
//   return CanActivate();
// };

export const resolve = () => {
  const courseService: CourseService = inject(CourseService);

  return courseService.getAllcourses();
};
