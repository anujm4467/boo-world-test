/**
 * Enumeration representing different intervals for data aggregation.
 * Use this enum to specify the interval when querying or aggregating data.
 * @enum {string}
 */
export enum Interval {
  DAY = 'day',
  MONTH = 'month',
  WEEK = 'week',
}

/**
 * Enum representing document columns for vital statistics.
 * @enum {string}
 */
export enum DocumentColumn {
  VITALS_STEPS = '$VITALS_STEPS',
  VITALS_HEART_RATE = '$VITALS_HEART_RATE',
  VITALS_OXYGEN_SATURATION = '$VITALS_OXYGEN_SATURATION',
}

/**
 * Enum representing time granularities.
 * @enum {string}
 */
export enum Granularity {
  SECONDS = 'seconds',
  MINUTES = 'minutes',
  HOURS = 'hours',
}

/**
 * Enum representing meta fields for different health metrics.
 * @enum {string}
 */
export enum MetaField {
  OXYGEN = 'oxygen',
  HEART_RATE = 'heart-rate',
  ACTIVITY = 'activity',
}

export enum ConsumerTopic {
  ACTIVITY_TOPIC = 'vital_activity',
  HEART_RATE_TOPIC = 'vitals_heartrate',
  OXYGEN_TOPIC = 'vitals_oxygensaturation',
  DIGITAL_TRIAGE = 'digital_triage_export',
}
