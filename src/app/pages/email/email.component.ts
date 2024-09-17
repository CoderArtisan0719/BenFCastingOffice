import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatRadioModule } from "@angular/material/radio";
import { CommonModule } from "@angular/common";
import { QuillModule } from "ngx-quill";

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    QuillModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss'
})

export class EmailComponent {
  emailForm: FormGroup;
  richContent = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']
    ]
  };
  selectedFiles: File[] = [];

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      subject: ['', Validators.required],
      richContent: ['sdsd', Validators.required],
      attachment: [null],
      recipients: ['all-eligible', Validators.required]
    });
  }

  onFileChange(event: any) {
    this.selectedFiles = Array.from(event.target.files);
    this.emailForm.patchValue({ attachment: this.selectedFiles });
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.emailForm.patchValue({ attachment: this.selectedFiles });
  }

  sendEmail() {
    if (this.emailForm.valid) {
      const formData = new FormData();
      formData.append('subject', this.emailForm.get('subject')?.value);
      formData.append('richContent', this.emailForm.get('richContent')?.value);

      this.selectedFiles.forEach((file, index) => {
        formData.append('attachments[]', file, file.name);
      });

      console.log('Sending email with data:', formData);
    }
  }
}
