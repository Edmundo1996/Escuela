import { Request, Response } from "express";
import { generateAccessToken } from "../utils/generateToken";
import cache from "../utils/cache";
import dayjs from "dayjs";

export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  if (username !== "admin" || password !== "1234") {
    res.status(401).json({ message: "Credenciales inválidas" });
    return;
  }

  const userId = "123456";
  const accessToken = generateAccessToken(userId);

  cache.set(userId, accessToken, 60 * 15);
  res.json({ accessToken });
};

export const getTimeToken = (req: Request, res: Response): void => {
  const { userId } = req.body;
  const ttl = cache.getTtl(userId);

  if (!ttl || ttl < Date.now()) {
    res.status(404).json({ message: "Token no encontrado o expirado" });
    return;
  }

  const now = Date.now();
  const timeToLife = Math.floor((ttl - now) / 1000); // segundos restantes
  const expTime = dayjs(ttl).format('HH:mm:ss');

  res.json({
    timeToLife,
    expTime
  });
};