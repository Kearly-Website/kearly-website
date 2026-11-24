declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    PHOTO_ADMIN_EMAIL?: string;
    WORKSHOP_ADMIN_EMAIL?: string;
  }
}

// The installed Workers types predate the documented R2 metadata projection.
interface R2ListOptions {
  include?: ("httpMetadata" | "customMetadata")[];
}
