'use client';

import { useState } from 'react';
import { Input, Button } from 'antd';
import { DivTag, H1Tag, PTag, SectionTag } from './HTMLTags';

const { Password } = Input;

export default function PasswordProtection({ onSubmit, error }) {
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(password);
    setIsSubmitting(false);
  };

  return (
    <SectionTag className="password-section">
      <DivTag className="container">
        <DivTag className="row">
          <DivTag className="col-md-12">
            <DivTag className="password-form-wrapper">
              
              <H1Tag className="text-center mb-4">
                Protected Content
              </H1Tag>

              <PTag className="text-center mb-4">
                This content is password protected. Please enter your password to view.
              </PTag>

              <form
                className="comment-form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                {/* Ant Design Password Input */}
                <div className="password-input-wrapper">
                  <Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    size="large"
                  />
                </div>

                {error && (
                  <DivTag className="validation-errors text-danger" role="alert">
                    {error}
                  </DivTag>
                )}

                <DivTag className="btn-div mt-3">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    block
                  >
                    {isSubmitting ? 'Verifying...' : 'Submit'}
                  </Button>
                </DivTag>

              </form>
            </DivTag>
          </DivTag>
        </DivTag>
      </DivTag>
    </SectionTag>
  );
}