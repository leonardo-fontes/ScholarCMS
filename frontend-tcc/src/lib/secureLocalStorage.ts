/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from "crypto-js";

const HASH = import.meta.env.VITE_SECURE_LOCAL_STORAGE_HASH_KEY;
const PREFIX = import.meta.env.VITE_SECURE_LOCAL_STORAGE_PREFIX;

const CYPHER_ENCRYPT = crypto.AES.encrypt;
const CYPHER_DECRYPT = crypto.AES.decrypt;

const options: any = { iv: { sigBytes: 16, words: [0, 0, 0, 0] } };

export default {
  get(name: string) {
    // Verifique se o HASH está definido
    if (!HASH) {
      console.error("HASH não está definido");
      return null;
    }

    // Verifique se o nome não está vazio
    if (!name) {
      console.error("Nome não pode ser vazio ou indefinido");
      return null;
    }

    // Gera a chave criptografada
    const nameEcrypt = crypto.HmacSHA1(name, HASH);
    let value: string | crypto.lib.WordArray | null = localStorage.getItem(
      `${PREFIX}.${nameEcrypt}`
    );

    // Verifique se o valor existe
    if (!value) {
      return null;
    }

    try {
      // Descriptografar o valor
      value = CYPHER_DECRYPT(value as string, HASH, options);
      value = value.toString(crypto.enc.Utf8);
    } catch (error) {
      console.error("Erro ao descriptografar o valor:", error);
      return null;
    }

    return value;
  },

  set(name: string, value: unknown) {
    if (!HASH) {
      console.error("HASH não está definido");
      return;
    }

    const nameEcrypt = crypto.HmacSHA1(name, HASH);
    let valueEcrypt =
      typeof value === "object" ? JSON.stringify(value) : `${value}`;

    // Criptografar o valor
    try {
      valueEcrypt = CYPHER_ENCRYPT(valueEcrypt, HASH, options).toString();
      localStorage.setItem(`${PREFIX}.${nameEcrypt}`, valueEcrypt);
    } catch (error) {
      console.error("Erro ao criptografar e salvar o valor:", error);
    }
  },

  remove(name: string) {
    if (!HASH) {
      console.error("HASH não está definido");
      return;
    }

    const nameEcrypt = crypto.HmacSHA1(name, HASH);
    localStorage.removeItem(`${PREFIX}.${nameEcrypt}`);
  },

  clear() {
    localStorage.clear();
  },
};
