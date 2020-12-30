import RPi.GPIO as GPIO
from time import sleep

GPIO.setmode(GPIO.BCM)
GPIO.setup(4, GPIO.OUT)
GPIO.setup(5, GPIO.IN, pull_up_down=GPIO.PUD_UP)

while True:
  sleep(0.2)
  if GPIO.input(5) == False:
    if GPIO.input(4) == 0:
      GPIO.output(4, 1)
    else:
      GPIO.output(4, 0)