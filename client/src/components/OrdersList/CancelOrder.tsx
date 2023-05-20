import { Button, DialogActions, DialogTitle } from "@mui/material";
import { useTranslation } from "react-i18next";

const CancelOrder = (props: { onCancel: () => void, onClose: () => void }) => {
  const { onCancel, onClose } = props;
  const { t } = useTranslation();
  return (
    <>
      <DialogTitle>{t("dialog.cancel_your_reservation")}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>{t('time.cancel')}</Button>
        <Button onClick={onCancel} variant="contained">{t("button.submit")}</Button>
      </DialogActions>
    </>
  );
};

export default CancelOrder;
