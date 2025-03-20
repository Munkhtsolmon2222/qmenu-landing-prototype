'use client';
import { CARD_MUTATION } from '@/graphql/mutation';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { BRANCH_QUERY, TOKEN_QUERY } from '@/graphql/query';

function useTopup() {
  const { domain } = useParams();
  const [cardNumber, setCardNumber] = useState('');
  const [amount, setAmount] = useState(0);
  const [isValidCard, setIsValidCard] = useState(false);
  const [tab, setTab] = useState<'topup' | 'transaction'>('topup');

  const navigation = [
    {
      name: 'Цэнэглэх',
      path: 'topup',
      current: false,
    },
    { name: 'Гүйлгээ', path: 'transaction', current: false },
  ];

  const [branch, setBranch] = useState('');

  const [getMerchantByDomain, { data, loading }] = useLazyQuery(
    BRANCH_QUERY.GET_MERCHANT_BYDOMAIN,
    {
      onCompleted(data) {
        setBranch(data?.getMerchantByDomain?.id);
      },
    },
  );

  const [getToken, { loading: getting }] = useMutation(TOKEN_QUERY.CURRENT_TOKEN, {
    onCompleted(data) {
      localStorage?.setItem('token', data?.getToken?.token);
      getMerchantByDomain({ variables: { domain } });
    },
  });

  useEffect(() => {
    getToken({ variables: { code: '', type: 'QM', token: '' } });
  }, [domain, getToken]);

  const [checkCard, { data: card, loading: checking }] = useMutation(CARD_MUTATION.CHECK_CARD, {
    onCompleted(data) {
      if (data) {
        setIsValidCard(true);
      }
    },
  });

  const [createTopUp, { data: transaction, loading: creating }] = useMutation(
    CARD_MUTATION.CREATE_TOPUP,
  );

  const validateCardNumber = () => {
    if (branch && cardNumber) {
      checkCard({ variables: { card: cardNumber, branch } });
    }
  };

  const fundCard = () => {
    if (branch && card?.checkCard && cardNumber) {
      createTopUp({ variables: { amount: amount, id: card?.checkCard?.id } });
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value;
    setCardNumber(number);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(Number(value));
  };

  return {
    checking,
    branch,
    isValidCard,
    card,
    validateCardNumber,
    loading,
    handleCardNumberChange,
    handleAmountChange,
    cardNumber,
    amount,
    navigation,
    getting,
    data,
    tab,
    setTab,
    fundCard,
    creating,
    transaction,
  };
}

export default useTopup;
