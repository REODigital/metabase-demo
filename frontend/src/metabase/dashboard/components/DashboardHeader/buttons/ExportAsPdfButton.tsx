import cx from "classnames";
import { match } from "ts-pattern";
import { t } from "ttag";

import { useHasTokenFeature } from "metabase/common/hooks";
import {
  type DashboardAccessedVia,
  trackExportDashboardToPDF,
} from "metabase/dashboard/analytics";
import { DASHBOARD_PDF_EXPORT_ROOT_ID } from "metabase/dashboard/constants";
import { useDashboardContext } from "metabase/dashboard/context/context";
import { useDispatch } from "metabase/lib/redux";
import { isJWT } from "metabase/lib/utils";
import { isUuid } from "metabase/lib/uuid";
import { ActionIcon, Icon, Tooltip } from "metabase/ui";
import { saveDashboardPdf } from "metabase/visualizations/lib/save-dashboard-pdf";

import CS from "./ExportAsPdfButton.module.css";

export const ExportAsPdfButton = ({
  hasTitle,
  hasVisibleParameters,
}: {
  hasTitle?: boolean;
  hasVisibleParameters?: boolean;
}) => {
  const { dashboard } = useDashboardContext();
  const dispatch = useDispatch();
  const isWhitelabeled = useHasTokenFeature("whitelabel");
  const includeBranding = !isWhitelabeled;

  const saveAsPDF = () => {
    const dashboardAccessedVia = match(dashboard?.id)
      .returnType<DashboardAccessedVia>()
      .when(isJWT, () => "static-embed")
      .when(isUuid, () => "public-link")
      .otherwise(() => "sdk-embed");

    trackExportDashboardToPDF({
      dashboardAccessedVia,
    });

    const cardNodeSelector = `#${DASHBOARD_PDF_EXPORT_ROOT_ID}`;
    return saveDashboardPdf({
      selector: cardNodeSelector,
      dashboardName: dashboard?.name ?? t`Exported dashboard`,
      includeBranding,
    });
  };

  const hasDashboardTabs = dashboard?.tabs && dashboard.tabs.length > 1;

  if (!dashboard) {
    return null;
  }

  return (
    <Tooltip label={t`Download as PDF`}>
      <ActionIcon
        onClick={() => dispatch(saveAsPDF)}
        className={cx({
          [CS.CompactExportAsPdfButton]:
            !hasTitle && (hasVisibleParameters || hasDashboardTabs),
          [CS.ParametersVisibleWithNoTabs]:
            hasVisibleParameters && !hasDashboardTabs,
        })}
        aria-label={t`Download as PDF`}
        data-testid="export-as-pdf-button"
      >
        <Icon name="download" />
      </ActionIcon>
    </Tooltip>
  );
};
