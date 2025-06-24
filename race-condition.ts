/**
 * Example 1: Shared State Between Micro-Apps
 */
@Injectable({
  providedIn: 'root',
})
export class SharedStateService {
  userProfile = { name: '', email: '' };

  updateProfile(profile: Partial<{ name: string; email: string }>) {
    Object.assign(this.userProfile, profile);
  }
}

// Solution: Use RxJS BehaviorSubject for atomic updates
@Injectable({
  providedIn: 'root',
})
export class SharedStateServiceWithRxJS {
  private userProfileSubject = new BehaviorSubject<{ name: string; email: string }>({ name: '', email: '' });
  userProfile$ = this.userProfileSubject.asObservable();

  updateProfile(profile: Partial<{ name: string; email: string }>) {
    const currentProfile = this.userProfileSubject.getValue();
    this.userProfileSubject.next({ ...currentProfile, ...profile });
  }
}

/**
 * Example 2: API Calls Triggered by Multiple Micro-Apps
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private userCache$?: Observable<any>;

  getUser() {
    if (!this.userCache$) {
      this.userCache$ = this.http.get('/api/user').pipe(shareReplay(1));
    }
    return this.userCache$;
  }
}

/**
 * Example 3: Event Listeners in Micro-Apps
 */
@Injectable({
  providedIn: 'root',
})
export class ResizeService {
  private resizeSubject = new Subject<void>();
  resize$ = this.resizeSubject.asObservable();

  constructor() {
    window.addEventListener('resize', () => this.resizeSubject.next());
  }
}

// Usage in Micro-App A
this.resizeService.resize$.subscribe(() => {
  console.log('Micro-App A: Resizing...');
});

// Usage in Micro-App B
this.resizeService.resize$.subscribe(() => {
  console.log('Micro-App B: Resizing...');
});

/**
 * Example 4: Lazy Loading Conflicts
 */
@Injectable({
  providedIn: 'root',
})
export class ChartingLibraryService {
  private initialized = false;

  init() {
    if (!this.initialized) {
      import('charting-library').then((chartingLib) => {
        chartingLib.init();
        this.initialized = true;
      });
    }
  }
}

/**
 * Example 5: Micro-App Bootstrapping
 */
window.globalConfig = null;

function loadConfig() {
  return fetch('/api/config')
    .then((response) => response.json())
    .then((config) => {
      window.globalConfig = config;
    });
}

loadConfig().then(() => {
  bootstrapMicroAppA();
  bootstrapMicroAppB();
});