export function getCourseRoute(courseSlug: string) {
    return `/courses/${courseSlug}`;
  }
  
  export function getCourseQuizRoute(
    courseSlug: string,
  ) {
    return `/courses/${courseSlug}/quiz`;
  }
  
  export function getCourseCertificateRoute(
    courseSlug: string,
  ) {
    return `/courses/${courseSlug}/certificate`;
  }