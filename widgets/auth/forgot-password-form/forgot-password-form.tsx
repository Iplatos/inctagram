import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller, useForm } from 'react-hook-form';

import { CloseDialog, Modal } from '@/features';
import { useForgotPasswordMutation } from '@/shared/api/auth.service';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui';
import { Button } from '@/shared/ui/Button/button';
import { Card } from '@/shared/ui/Card/Card';
import { TextField } from '@/shared/ui/textField/TextField';
import { Trans } from '@/widgets/Trans/Trans';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { z } from 'zod';

import style from './forgot-password.module.scss';

export const ForgotPasswordForm = () => {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const { t } = useTranslation();

  const signInSchema = z.object({
    captcha: z.string(),
    email: z.string().email(t.auth.forgotPasswordPage.invalidEmail).nonempty('Enter email'),
  });

  type FormValuesType = z.infer<typeof signInSchema>;
  const [open, setOpen] = useState<boolean>(false);

  const {
    control,
    formState: { dirtyFields, isValid },
    getValues,
    handleSubmit,
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      captcha: '',
      email: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(signInSchema),
  });

  const [forgotPassword] = useForgotPasswordMutation();

  const onSubmit = (data: FormValuesType) => {
    forgotPassword({
      email: data.email,
    });
  };

  function handleModalClosed() {
    setOpen(false);
    reset();
    recaptchaRef.current?.reset();
  }

  function handleModalOpened() {
    if (isValid) {
      setOpen(true);
    }
  }

  const SITE_KEY = '6Lek3hEpAAAAACzSq5KIvkUdoGZYl579JldVdZs-'; //for incubator-icta-trainee.uk
  const LOCALHOST_KEY = '6Lfm4xEpAAAAAD8LnoqR-DwtFEgFJiiOHaWhAg22'; //for localhost:3000

  return (
    /* eslint-disable */
    <Card className={style.card}>
      <Typography.H1 style={{ paddingBottom: "37px" }}>
        {t.auth.forgotPasswordPage.title}
      </Typography.H1>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              errors={fieldState?.error?.message}
              inputtype={"text"}
              label={"Email"}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
        <Typography.Regular14 className={`${style.message} ${style.fontColor}`}>
          {t.auth.forgotPasswordPage.message}
        </Typography.Regular14>
        <Button
          disabled={dirtyFields.captcha && dirtyFields.email ? false : true}
          fullWidth
          onClick={handleModalOpened}
          type={"submit"}
        >
          {t.auth.forgotPasswordPage.sendLink}
        </Button>
        <Modal
          onClose={handleModalClosed}
          open={open}
          showCloseButton
          title={t.auth.forgotPasswordPage.titleModal}
        >
          <Typography.Regular16 className={style.dialogDescription}>
            <Trans
              tags={{
                "1": () => <b>{`${getValues().email}`}</b>
              }}
              text={t.auth.forgotPasswordPage.messageModal}
            />
          </Typography.Regular16>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 25 }}>
            <CloseDialog asChild>
              <Button className={style.dialogButton} variant={"primary"}>
                OK
              </Button>
            </CloseDialog>
          </div>
        </Modal>
        <Button className={style.buttonBack} fullWidth variant={"tertiary"}>
          <Link href={"/signIn"}>{t.auth.forgotPasswordPage.backToSignIn}</Link>
        </Button>

        <Controller
          control={control}
          name="captcha"
          render={({ field }) => (
            <ReCAPTCHA
              {...field}
              /* errors={fieldState?.error?.message}*/
              onChange={field.onChange}
              ref={recaptchaRef}
              sitekey={SITE_KEY}
              theme={"dark"}
              /*     value={field.value}*/
            />
          )}
        />
      </form>
    </Card>
    /* eslint-enable */
  );
};
