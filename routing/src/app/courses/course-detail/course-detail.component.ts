import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscriber, Subscription } from "rxjs";
import { Course } from "src/app/Models/course";
import { CourseService } from "src/app/Services/course.service";

@Component({
  selector: "app-course-detail",
  templateUrl: "./course-detail.component.html",
  styleUrls: ["./course-detail.component.css"],
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  selectedCourse: Course;
  courseId: number;

  courseService: CourseService = inject(CourseService);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  paramMapObs: Subscription;

  ngOnInit(): void {
    //this.courseId = this.activeRoute.snapshot.params["id"];
    //this.courseId = +this.activeRoute.snapshot.paramMap.get("id");

    this.paramMapObs = this.activeRoute.paramMap.subscribe((data) => {
      this.courseId = +data.get("id");
      this.selectedCourse = this.courseService.courses.find(
        (c) => c.id === this.courseId
      );
    });
  }

  ngOnDestroy(): void {
    this.paramMapObs.unsubscribe();
  }
}
