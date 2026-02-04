/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: appointments
 * Interface for Appointments
 */
export interface Appointments {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  userId?: string;
  /** @wixFieldType date */
  appointmentDate?: Date | string;
  /** @wixFieldType time */
  appointmentTime?: any;
  /** @wixFieldType text */
  departmentName?: string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType text */
  reasonForVisit?: string;
}


/**
 * Collection ID: departments
 * Interface for Departments
 */
export interface Departments {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  departmentName?: string;
  /** @wixFieldType text */
  serviceDescription?: string;
  /** @wixFieldType text */
  operatingHours?: string;
  /** @wixFieldType text */
  contactEmail?: string;
  /** @wixFieldType text */
  contactPhone?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  departmentImage?: string;
}


/**
 * Collection ID: faqs
 * Interface for FrequentlyAskedQuestions
 */
export interface FrequentlyAskedQuestions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  question?: string;
  /** @wixFieldType text */
  answer?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType boolean */
  isFeatured?: boolean;
  /** @wixFieldType datetime */
  lastUpdated?: Date | string;
}


/**
 * Collection ID: tokens
 * Interface for QueueTokens
 */
export interface QueueTokens {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  tokenNumber?: string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType number */
  queuePosition?: number;
  /** @wixFieldType number */
  estimatedWaitTime?: number;
  /** @wixFieldType datetime */
  issuedAt?: Date | string;
  /** @wixFieldType datetime */
  completedAt?: Date | string;
  /** @wixFieldType boolean */
  isActive?: boolean;
}


/**
 * Collection ID: userprofiles
 * Interface for UserProfiles
 */
export interface UserProfiles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  emailAddress?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  wixMemberId?: string;
  /** @wixFieldType date */
  dateOfBirth?: Date | string;
  /** @wixFieldType text */
  address?: string;
}
