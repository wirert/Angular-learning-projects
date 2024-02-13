import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import { StudentService } from "../Services/student.service";
import { Student } from "../Models/Student";
import { Observable, Observer } from "rxjs";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
})
export class AdminComponent implements OnInit {
  studentService: StudentService = inject(StudentService);

  isEditing: boolean = false;
  isInserting: boolean = false;
  stdIdToEdit: number;

  students: Student[];
  totalMarks: number;

  filterText: string = "All";
  totalStudents = new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      resolve(this.students.length);
    }, 2000);
  });

  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });

  //PROPERTIES FOR INSERTING
  @ViewChild("name") Name: ElementRef;
  @ViewChild("gender") Gender: ElementRef;
  @ViewChild("dob") Dob: ElementRef;
  @ViewChild("course") Course: ElementRef;
  @ViewChild("marks") Marks: ElementRef;
  @ViewChild("fee") Fee: ElementRef;

  //PROPERTIES FOR EDITING
  @ViewChild("editName") editName: ElementRef;
  @ViewChild("editGender") editGender: ElementRef;
  @ViewChild("editDob") editDob: ElementRef;
  @ViewChild("editCourse") editCourse: ElementRef;
  @ViewChild("editMarks") editMarks: ElementRef;
  @ViewChild("editFee") editFee: ElementRef;

  ngOnInit() {
    this.students = this.studentService.filterStudentsByGender(this.filterText);
    this.totalMarks = this.studentService.totalMarks;
  }

  OnInsertClicked() {
    this.isInserting = true;
  }
  OnInsertCancelled() {
    this.isInserting = false;
  }
  OnInsertSaved() {
    this.studentService.CreateStudent(
      this.Name.nativeElement.value,
      this.Gender.nativeElement.value,
      this.Dob.nativeElement.value,
      this.Course.nativeElement.value,
      this.Marks.nativeElement.value,
      this.Fee.nativeElement.value
    );
    this.isInserting = false;
    this.students = this.studentService.filterStudentsByGender(this.filterText);
  }

  OnEditClicked(stdId: number) {
    this.isEditing = true;
    this.stdIdToEdit = stdId;
  }
  OnEditCancelled() {
    this.isEditing = false;
  }

  OnEditSaved(student: Student) {
    student.name = this.editName.nativeElement.value;
    student.gender = this.editGender.nativeElement.value;
    student.dob = this.editDob.nativeElement.value;
    student.course = this.editCourse.nativeElement.value;
    student.marks = this.editMarks.nativeElement.value;
    student.fee = this.editFee.nativeElement.value;

    this.isEditing = false;
    this.students = this.studentService.filterStudentsByGender(this.filterText);
  }

  OnFilterValueChange(event) {
    console.log(event);
    this.filterText = event.target.value;
    this.students = this.studentService.filterStudentsByGender(this.filterText);
  }
}