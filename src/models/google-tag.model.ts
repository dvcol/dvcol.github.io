type GAnalyticsParameters = [string, string | Date];
type GtagParameters = Record<string, string | Date | number>;

type Datalayer = GtagParameters | GAnalyticsParameters;

export type GoogleTagWindow = {
  dataLayer?: Datalayer[];
  gtag: (...args: Datalayer[]) => void;
};
