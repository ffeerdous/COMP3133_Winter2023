export interface Mission {
    mission_name: string;
    flight_number: number;
    launch_date_utc: string;
    launch_year: string;
    details: string;
    rocket: {
      rocket_name: string;
    };
    launch_site: {
      site_name_long: string;
    };
    launch_success: boolean;
    launch_failure_details?: {
      reason: string;
    };
    links: {
      mission_patch: string;
      wikipedia?: string;
      mission_patch_small: string | null;
      article_link?: string;
      video_link?: string;
    };
  }