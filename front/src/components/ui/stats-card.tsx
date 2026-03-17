import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/shared/lib/classMerge";

interface IStatsCard {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;

  trend?: {
    value: string;
    isPositive: boolean;
  };

  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };

  isLoading?: boolean;

  className?: string;
}

interface ISimpleStatsCard {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  isLoading?: boolean;
}

const StatsCard: React.FC<IStatsCard> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  badge,
  isLoading = false,
  className,
}) => {
  return (
    <Card className={cn("transition-all hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        {isLoading && (
          <>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </>
        )}
        {!isLoading && (
          <>
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
              </CardTitle>

              {badge && (
                <Badge variant={badge.variant ?? "secondary"}>
                  {badge.text}
                </Badge>
              )}
            </div>

            {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
          </>
        )}
      </CardHeader>

      <CardContent>
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        )}
        {!isLoading && (
          <>
            <div className="text-2xl font-bold tracking-tight">{value}</div>

            {(description || trend) && (
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                {description && <span>{description}</span>}

                {trend && (
                  <div
                    className={cn(
                      "flex items-center gap-1 font-medium",
                      trend.isPositive ? "text-emerald-600" : "text-red-600",
                    )}
                  >
                    {trend.isPositive ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}

                    <span>
                      {trend.isPositive ? "+" : ""}
                      {trend.value}
                    </span>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

const SimpleStatsCard: React.FC<ISimpleStatsCard> = ({
  title,
  value,
  icon: Icon,
  isLoading = false,
}: {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  isLoading?: boolean;
}) => {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="flex items-center justify-between p-6">
        {isLoading && (
          <>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-28" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </>
        )}
        {!isLoading && (
          <>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
              <div className="text-2xl font-bold tracking-tight">{value}</div>
            </div>

            {Icon && <Icon className="h-8 w-8 text-muted-foreground" />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export { StatsCard, SimpleStatsCard };
