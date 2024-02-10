import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Course } from "../Models/course";
import { CourseService } from "../Services/course.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.css"],
})
export class CoursesComponent implements OnInit, OnDestroy {
  coursesService = inject(CourseService);
  AllCourses: Course[];

  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  routeObs: Subscription;
  searchString: string;

  ngOnInit(): void {
    this.routeObs = this.activeRoute.queryParamMap.subscribe((data) => {
      this.searchString = data.get("search");

      if (!this.searchString) {
        this.AllCourses = this.coursesService.courses;
      } else {
        this.AllCourses = this.coursesService.courses.filter((c) =>
          c.title.toLowerCase().includes(this.searchString.toLowerCase())
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.routeObs.unsubscribe();
  }
}
