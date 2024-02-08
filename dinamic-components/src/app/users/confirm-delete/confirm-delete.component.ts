import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { User } from "src/app/Models/User";

@Component({
  selector: "confirm-delete",
  templateUrl: "./confirm-delete.component.html",
  styleUrls: ["./confirm-delete.component.css"],
})
export class ConfirmDeleteComponent implements OnInit {
  constructor() {}

  @Input() userToDelete: User;

  @Output()
  OnConfirmation: EventEmitter<boolean> = new EventEmitter();

  ngOnInit() {}

  OnConfirmBtnClicked(value: boolean) {
    this.OnConfirmation.emit(value);
  }
}
