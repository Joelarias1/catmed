import { TestBed } from '@angular/core/testing';
import { NgIconsModule } from '@ng-icons/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import * as bootstrapIcons from '@ng-icons/bootstrap-icons';

const mockActivatedRoute = {
  snapshot: {
    paramMap: new Map(),
    queryParamMap: new Map()
  },
  paramMap: of(new Map()),
  queryParamMap: of(new Map())
};

const routes = [
  { path: 'user/dashboard', component: {} as any },
  { path: 'vet/dashboard', component: {} as any }
];

export const setupTestModule = async (component: any, additionalImports: any[] = []) => {
  await TestBed.configureTestingModule({
    imports: [
      NgIconsModule.withIcons(bootstrapIcons),
      component,
      ...additionalImports
    ],
    providers: [
      provideRouter(routes, withComponentInputBinding()),
      { provide: ActivatedRoute, useValue: mockActivatedRoute }
    ]
  }).compileComponents();
};