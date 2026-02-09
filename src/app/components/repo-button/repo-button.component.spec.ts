import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { RepoButtonComponent } from './repo-button.component';

describe('RepoButtonComponent', () => {
  it('renders the default label and href', async () => {
    await TestBed.configureTestingModule({
      imports: [RepoButtonComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(RepoButtonComponent);
    fixture.detectChanges();

    const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(anchor.textContent).toContain('View repository');
    expect(anchor.getAttribute('href')).toBe('https://github.com/magallart/angular-project-base');
  });

  it('renders a custom label and href', async () => {
    await TestBed.configureTestingModule({
      imports: [RepoButtonComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(RepoButtonComponent);
    fixture.componentRef.setInput('label', 'Go to repo');
    fixture.componentRef.setInput('href', 'https://example.com');
    fixture.detectChanges();

    const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(anchor.textContent).toContain('Go to repo');
    expect(anchor.getAttribute('href')).toBe('https://example.com');
  });
});
